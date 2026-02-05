'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  FiLogOut,
  FiRefreshCw,
  FiTrash2,
  FiCheck,
  FiPhone,
  FiUser,
  FiMessageSquare,
  FiCalendar,
  FiInbox,
  FiCheckCircle,
} from 'react-icons/fi'

interface Inquiry {
  id: string
  name: string
  phone: string
  service: string
  message: string | null
  isRead: boolean
  createdAt: string
}

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

const serviceLabels: Record<string, string> = {
  gym: '민죠이짐 (PT)',
  care: '민죠이케어 (체형관리)',
  both: '민죠이짐 + 민죠이케어',
}

export default function AdminDashboard() {
  const router = useRouter()
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [adminName, setAdminName] = useState('')
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)

  const fetchInquiries = useCallback(async (page = 1) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/inquiries?page=${page}&limit=10`)
      if (!response.ok) throw new Error('Failed to fetch')

      const data = await response.json()
      setInquiries(data.inquiries)
      setPagination(data.pagination)
    } catch {
      console.error('Failed to fetch inquiries')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/session')
        if (!response.ok) {
          router.push('/admin')
          return
        }
        const data = await response.json()
        setAdminName(data.admin.name)
        fetchInquiries()
      } catch {
        router.push('/admin')
      }
    }
    checkAuth()
  }, [router, fetchInquiries])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin')
  }

  const handleMarkAsRead = async (id: string) => {
    try {
      await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: true }),
      })
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, isRead: true } : inq))
      )
      if (selectedInquiry?.id === id) {
        setSelectedInquiry({ ...selectedInquiry, isRead: true })
      }
    } catch {
      console.error('Failed to mark as read')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    try {
      await fetch(`/api/inquiries/${id}`, { method: 'DELETE' })
      setInquiries((prev) => prev.filter((inq) => inq.id !== id))
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null)
      }
    } catch {
      console.error('Failed to delete')
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const unreadCount = inquiries.filter((inq) => !inq.isRead).length

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold gradient-text">민죠이 관리자</h1>
            <p className="text-sm text-gray-500">안녕하세요, {adminName}님</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-500 transition-colors"
          >
            <FiLogOut />
            <span>로그아웃</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">전체 문의</p>
                <p className="text-3xl font-bold">{pagination?.total || 0}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FiInbox className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">새 문의</p>
                <p className="text-3xl font-bold text-primary">{unreadCount}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <FiMessageSquare className="text-purple-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">처리 완료</p>
                <p className="text-3xl font-bold text-green-600">
                  {(pagination?.total || 0) - unreadCount}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FiCheckCircle className="text-green-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Inquiry List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-4 border-b flex items-center justify-between">
                <h2 className="font-semibold">문의 목록</h2>
                <button
                  onClick={() => fetchInquiries(pagination?.page || 1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="새로고침"
                >
                  <FiRefreshCw className={isLoading ? 'animate-spin' : ''} />
                </button>
              </div>

              {isLoading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                </div>
              ) : inquiries.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <FiInbox size={48} className="mx-auto mb-4 opacity-50" />
                  <p>아직 문의가 없습니다.</p>
                </div>
              ) : (
                <div className="divide-y">
                  {inquiries.map((inquiry) => (
                    <div
                      key={inquiry.id}
                      onClick={() => {
                        setSelectedInquiry(inquiry)
                        if (!inquiry.isRead) handleMarkAsRead(inquiry.id)
                      }}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedInquiry?.id === inquiry.id ? 'bg-purple-50' : ''
                      } ${!inquiry.isRead ? 'bg-blue-50/50' : ''}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            {!inquiry.isRead && (
                              <span className="w-2 h-2 bg-primary rounded-full"></span>
                            )}
                            <span className="font-medium">{inquiry.name}</span>
                            <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                              {serviceLabels[inquiry.service] || inquiry.service}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{inquiry.phone}</p>
                          {inquiry.message && (
                            <p className="text-sm text-gray-600 mt-2 line-clamp-1">
                              {inquiry.message}
                            </p>
                          )}
                        </div>
                        <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                          {formatDate(inquiry.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="p-4 border-t flex items-center justify-center space-x-2">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => fetchInquiries(page)}
                        className={`w-8 h-8 rounded-lg ${
                          pagination.page === page
                            ? 'bg-primary text-white'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm sticky top-4">
              {selectedInquiry ? (
                <>
                  <div className="p-4 border-b">
                    <h2 className="font-semibold">문의 상세</h2>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <FiUser className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{selectedInquiry.name}</p>
                        <p className="text-sm text-gray-500">
                          {serviceLabels[selectedInquiry.service] ||
                            selectedInquiry.service}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <FiPhone className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">연락처</p>
                        <a
                          href={`tel:${selectedInquiry.phone}`}
                          className="text-primary font-medium hover:underline"
                        >
                          {selectedInquiry.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <FiCalendar className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">신청일시</p>
                        <p className="font-medium">
                          {formatDate(selectedInquiry.createdAt)}
                        </p>
                      </div>
                    </div>

                    {selectedInquiry.message && (
                      <div>
                        <p className="text-sm text-gray-500 mb-2">문의 내용</p>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm whitespace-pre-wrap">
                            {selectedInquiry.message}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t flex space-x-2">
                      {!selectedInquiry.isRead && (
                        <button
                          onClick={() => handleMarkAsRead(selectedInquiry.id)}
                          className="flex-1 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center space-x-2"
                        >
                          <FiCheck />
                          <span>처리 완료</span>
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(selectedInquiry.id)}
                        className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center space-x-2"
                      >
                        <FiTrash2 />
                        <span>삭제</span>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <FiMessageSquare size={48} className="mx-auto mb-4 opacity-50" />
                  <p>문의를 선택하세요</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
