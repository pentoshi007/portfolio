'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, FileText, LogOut, Eye, Trash2, Plus, Edit, Check, X, Share2, Copy } from 'lucide-react';

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

interface Blog {
  _id: string;
  title: string;
  slug: string;
  body: string;
  published: boolean;
  previewToken?: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'messages' | 'blogs'>('messages');
  const [messages, setMessages] = useState<Message[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'messages') {
        const res = await fetch('/api/messages');
        if (res.ok) {
          const data = await res.json();
          setMessages(data);
        }
      } else {
        const res = await fetch('/api/blogs');
        if (res.ok) {
          const data = await res.json();
          setBlogs(data);
        }
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const markAsRead = async (id: string) => {
    await fetch(`/api/messages/${id}`, { method: 'PATCH' });
    setMessages(messages.map(m => m._id === id ? { ...m, read: true } : m));
  };

  const deleteMessage = async (id: string) => {
    if (confirm('Delete this message?')) {
      await fetch(`/api/messages/${id}`, { method: 'DELETE' });
      setMessages(messages.filter(m => m._id !== id));
    }
  };

  const deleteBlog = async (id: string) => {
    if (confirm('Delete this blog post?')) {
      await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      setBlogs(blogs.filter(b => b._id !== id));
    }
  };

  const togglePublish = async (blog: Blog) => {
    const res = await fetch(`/api/blogs/${blog._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !blog.published }),
    });
    if (res.ok) {
      setBlogs(blogs.map(b => b._id === blog._id ? { ...b, published: !b.published } : b));
    }
  };

  const copyPreviewLink = (blog: Blog) => {
    const previewUrl = `https://blogs.aniketpandey.website/${blog.slug}?preview=${blog.previewToken}`;
    navigator.clipboard.writeText(previewUrl);
    alert('Preview link copied to clipboard!');
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="border-b border-[#0fa]/20 bg-[#0a0a0f]/95">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[#0fa] font-mono">$</span>
            <span className="text-white font-bold">admin_panel</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-red-400 transition-colors font-mono text-sm"
          >
            <LogOut className="w-4 h-4" />
            logout
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-[#0fa]/10">
        <div className="max-w-6xl mx-auto px-4 flex">
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-2 px-6 py-4 font-mono text-sm border-b-2 transition-colors ${
              activeTab === 'messages' 
                ? 'border-[#0fa] text-[#0fa]' 
                : 'border-transparent text-gray-500 hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4" />
            messages
            {unreadCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-[#0fa] text-[#0a0a0f] text-xs font-bold rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`flex items-center gap-2 px-6 py-4 font-mono text-sm border-b-2 transition-colors ${
              activeTab === 'blogs' 
                ? 'border-[#0fa] text-[#0fa]' 
                : 'border-transparent text-gray-500 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            blogs
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center text-gray-500 font-mono py-12">
            $ loading data...
          </div>
        ) : activeTab === 'messages' ? (
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 font-mono py-12">
                No messages yet
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`hacker-card p-5 ${!msg.read ? 'border-[#0fa]/40' : ''}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-white font-medium">{msg.name}</span>
                        <span className="text-gray-500 text-sm">{msg.email}</span>
                        {!msg.read && (
                          <span className="px-2 py-0.5 bg-[#0fa]/20 text-[#0fa] text-xs font-mono">NEW</span>
                        )}
                      </div>
                      <p className="text-gray-300 text-sm">{msg.message}</p>
                      <p className="text-gray-500 font-mono text-xs mt-3">
                        {new Date(msg.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {!msg.read && (
                        <button
                          onClick={() => markAsRead(msg._id)}
                          className="p-2 text-gray-500 hover:text-[#0fa] transition-colors"
                          title="Mark as read"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteMessage(msg._id)}
                        className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div>
            <div className="flex justify-end mb-6">
              <button
                onClick={() => router.push('/admin/blogs/new')}
                className="flex items-center gap-2 px-4 py-2 bg-[#0fa] text-[#0a0a0f] font-mono text-sm hover:bg-[#0fa]/90 transition-colors"
              >
                <Plus className="w-4 h-4" />
                new blog
              </button>
            </div>

            {blogs.length === 0 ? (
              <div className="text-center text-gray-500 font-mono py-12">
                No blog posts yet
              </div>
            ) : (
              <div className="space-y-4">
                {blogs.map((blog) => (
                  <div key={blog._id} className="hacker-card p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-white font-medium">{blog.title}</h3>
                          <span className={`px-2 py-0.5 text-xs font-mono ${
                            blog.published 
                              ? 'bg-emerald-500/20 text-emerald-400' 
                              : 'bg-amber-500/20 text-amber-400'
                          }`}>
                            {blog.published ? 'PUBLISHED' : 'DRAFT'}
                          </span>
                        </div>
                        <p className="text-gray-500 font-mono text-xs">
                          /{blog.slug} • {new Date(blog.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {!blog.published && blog.previewToken && (
                          <button
                            onClick={() => copyPreviewLink(blog)}
                            className="p-2 text-gray-500 hover:text-blue-400 transition-colors"
                            title="Copy preview link"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => togglePublish(blog)}
                          className={`p-2 transition-colors ${
                            blog.published 
                              ? 'text-emerald-400 hover:text-amber-400' 
                              : 'text-gray-500 hover:text-emerald-400'
                          }`}
                          title={blog.published ? 'Unpublish' : 'Publish'}
                        >
                          {blog.published ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => router.push(`/admin/blogs/${blog._id}`)}
                          className="p-2 text-gray-500 hover:text-[#0fa] transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteBlog(blog._id)}
                          className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
