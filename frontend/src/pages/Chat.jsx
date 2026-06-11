import { useState, useEffect, useRef } from "react"
import { ChevronLeft, Send } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { io } from "socket.io-client"
import { getMessagesByChat, getLocalUser } from "../Services/api"

// conecta no servidor de socket uma vez ao importar o componente
const socket = io('http://localhost:3000')

export default function Chat() {
  const { id: chatId } = useParams()
  const user = getLocalUser()
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const bottomRef = useRef(null)

  // carrega histórico e entra na sala do chat
  useEffect(() => {
    if (!chatId) return

    const fetchMessages = async () => {
      try {
        const data = await getMessagesByChat(chatId)
        setMessages(data)
      } catch (err) {
        console.error('erro ao buscar mensagens:', err)
      }
    }

    fetchMessages()
    socket.emit('join_chat', chatId)

    // recebe mensagens em tempo real
    socket.on('receive_message', (msg) => {
      setMessages((prev) => [...prev, msg])
    })

    return () => { socket.off('receive_message') }
  }, [chatId])

  // rola para o final quando chegam novas mensagens
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!text.trim() || !chatId) return
    socket.emit('send_message', { chat_id: chatId, sender_id: user?.id, content: text.trim() })
    setText('')
  }

  const handleKeyDown = (e) => { if (e.key === 'Enter') handleSend() }

  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col justify-between font-sans">
      <div className="bg-white px-4 pt-12 pb-3 border-b border-slate-100 flex items-center gap-3 sticky top-0 z-10">
        <Link to="/messages" className="p-1.5 text-slate-400 bg-slate-50 rounded-full"><ChevronLeft size={20} /></Link>
        <div className="w-10 h-10 bg-indigo-500 text-white font-bold rounded-full flex items-center justify-center text-xs">CH</div>
        <div>
          <h2 className="text-sm font-bold text-[#1a233d]">Chat #{chatId}</h2>
          <p className="text-[10px] text-[#2ecc71]">Conectado</p>
        </div>
      </div>

      <div className="flex-1 p-5 space-y-4 overflow-y-auto">
        {messages.map((msg) => {
          const isMe = msg.sender_id === user?.id
          return (
            <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[75%] p-4 rounded-2xl text-sm shadow-sm leading-relaxed ${isMe ? 'bg-[#2ecc71] text-white rounded-tr-none' : 'bg-white text-[#1a233d] rounded-tl-none border border-slate-100'}`}>
                {msg.content}
              </div>
              <span className="text-[9px] text-slate-300 mt-1 px-1">
                {new Date(msg.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      <div className="p-4 bg-white border-t border-slate-100 sticky bottom-0 flex items-center gap-3">
        <input type="text" placeholder="Digite uma mensagem..." value={text}
          onChange={(e) => setText(e.target.value)} onKeyDown={handleKeyDown}
          className="flex-1 bg-slate-50 border border-slate-100 rounded-full px-5 py-3 text-sm focus:outline-none placeholder-slate-300 text-slate-700"
        />
        <button onClick={handleSend} className="bg-[#2ecc71] text-white p-3 rounded-full hover:bg-[#27ae60] transition shadow-md">
          <Send size={16} className="transform rotate-[-15deg] translate-x-[-1px]" />
        </button>
      </div>
    </div>
  )
}
import { ChevronLeft, Send } from "lucide-react";
import { Link } from "react-router-dom"; 

export default function Chat() {
  const messages = [
    { id: 1, text: "Olá Rafael! Vi seu perfil e achei muito interessante.", time: "09:45", isMe: false },
    { id: 2, text: "Obrigado, Ana! Fico feliz em saber.", time: "09:47", isMe: true },
    { id: 3, text: "Temos uma vaga React Senior perfeita pro seu perfil.", time: "09:50", isMe: false },
    { id: 4, text: "Conta mais! Estou muito interessado.", time: "09:52", isMe: true },
    { id: 5, text: "Plataforma SaaS B2B, 6 meses. Budget no anúncio.", time: "10:15", isMe: false },
    { id: 6, text: "Vi o anúncio, topei! Quando começa?", time: "10:28", isMe: true },
    { id: 7, text: "Ótimo! Pode começar na segunda?", time: "10:32", isMe: false },
  ];

  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col justify-between font-sans">
      
      
      <div className="bg-white px-4 pt-12 pb-3 border-b border-slate-100 flex items-center gap-3 sticky top-0 z-10">
    
        <Link to="/messages" className="p-1.5 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-full">
          <ChevronLeft size={20} />
        </Link>
        
        <div className="w-10 h-10 bg-indigo-500 text-white font-bold rounded-full flex items-center justify-center text-xs">
          AF
        </div>
        <div>
          <h2 className="text-sm font-bold text-[#1a233d]">Ana Faria</h2>
          <p className="text-[10px] text-slate-400">TechNova • <span className="text-[#2ecc71]">Online agora</span></p>
        </div>
      </div>
      {/* Janela de Mensagens */}
      <div className="flex-1 p-5 space-y-4 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[75%] p-4 rounded-2xl text-sm shadow-sm leading-relaxed ${
              msg.isMe 
                ? 'bg-[#2ecc71] text-white rounded-tr-none' 
                : 'bg-white text-[#1a233d] rounded-tl-none border border-slate-100'
            }`}>
              {msg.text}
            </div>
            <span className="text-[9px] text-slate-300 mt-1 px-1 font-medium">{msg.time}</span>
          </div>
        ))}
      </div>

      {/* Input Flutuante de Envio Inferior */}
      <div className="p-4 bg-white border-t border-slate-100 sticky bottom-0 flex items-center gap-3">
        <input 
          type="text" 
          placeholder="Digite uma mensagem..." 
          className="flex-1 bg-slate-50 border border-slate-100 rounded-full px-5 py-3 text-sm focus:outline-none placeholder-slate-300 text-slate-700"
        />
        <button className="bg-[#2ecc71] text-white p-3 rounded-full hover:bg-[#27ae60] transition shadow-md shadow-emerald-100 flex items-center justify-center">
          <Send size={16} className="transform rotate-[-15deg] translate-x-[-1px]" />
        </button>
      </div>

    </div>
  );
}