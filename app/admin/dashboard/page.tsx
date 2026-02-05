'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
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
  FiHome,
  FiSettings,
  FiGrid,
  FiImage,
  FiMenu,
  FiEdit2,
  FiPlus,
  FiX,
  FiSave,
  FiActivity,
  FiTarget,
  FiHeart,
  FiMapPin,
  FiList,
  FiUpload,
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

interface ContentItem {
  id: string
  [key: string]: unknown
}

const serviceLabels: Record<string, string> = {
  gym: '민죠이짐 (PT)',
  care: '민죠이케어 (체형관리)',
  both: '민죠이짐 + 민죠이케어',
}

// 콘텐츠 타입 설정
const contentTypeConfig: Record<string, { label: string; fields: { name: string; label: string; type: string; required?: boolean }[] }> = {
  'hero-content': {
    label: '히어로 섹션',
    fields: [
      { name: 'title', label: '제목', type: 'text', required: true },
      { name: 'subtitle', label: '부제목', type: 'text', required: true },
      { name: 'description', label: '설명', type: 'textarea', required: true },
      { name: 'buttonText1', label: '버튼1 텍스트', type: 'text', required: true },
      { name: 'buttonLink1', label: '버튼1 링크', type: 'text', required: true },
      { name: 'buttonText2', label: '버튼2 텍스트', type: 'text' },
      { name: 'buttonLink2', label: '버튼2 링크', type: 'text' },
      { name: 'backgroundImage', label: '배경 이미지', type: 'image' },
      { name: 'order', label: '순서', type: 'number' },
      { name: 'isActive', label: '활성화', type: 'checkbox' },
    ],
  },
  'hero-stats': {
    label: '히어로 통계',
    fields: [
      { name: 'value', label: '수치', type: 'text', required: true },
      { name: 'label', label: '레이블', type: 'text', required: true },
      { name: 'order', label: '순서', type: 'number' },
      { name: 'isActive', label: '활성화', type: 'checkbox' },
    ],
  },
  'about-features': {
    label: 'About 특징',
    fields: [
      { name: 'title', label: '제목', type: 'text', required: true },
      { name: 'order', label: '순서', type: 'number' },
      { name: 'isActive', label: '활성화', type: 'checkbox' },
    ],
  },
  'gym-programs': {
    label: '민죠이짐 프로그램',
    fields: [
      { name: 'title', label: '제목', type: 'text', required: true },
      { name: 'description', label: '설명', type: 'textarea', required: true },
      { name: 'icon', label: '아이콘', type: 'select', required: true },
      { name: 'image', label: '프로그램 이미지', type: 'image' },
      { name: 'order', label: '순서', type: 'number' },
      { name: 'isActive', label: '활성화', type: 'checkbox' },
    ],
  },
  'gym-targets': {
    label: '민죠이짐 대상',
    fields: [
      { name: 'title', label: '제목', type: 'text', required: true },
      { name: 'description', label: '설명', type: 'textarea', required: true },
      { name: 'order', label: '순서', type: 'number' },
      { name: 'isActive', label: '활성화', type: 'checkbox' },
    ],
  },
  'care-services': {
    label: '민죠이케어 서비스',
    fields: [
      { name: 'title', label: '제목', type: 'text', required: true },
      { name: 'description', label: '설명', type: 'textarea', required: true },
      { name: 'icon', label: '아이콘', type: 'select', required: true },
      { name: 'image', label: '서비스 이미지', type: 'image' },
      { name: 'features', label: '특징 (쉼표로 구분)', type: 'text', required: true },
      { name: 'order', label: '순서', type: 'number' },
      { name: 'isActive', label: '활성화', type: 'checkbox' },
    ],
  },
  'facilities': {
    label: '시설 정보',
    fields: [
      { name: 'type', label: '타입', type: 'facility-type', required: true },
      { name: 'title', label: '제목', type: 'text', required: true },
      { name: 'description', label: '설명', type: 'textarea' },
      { name: 'image', label: '시설 이미지', type: 'image' },
      { name: 'order', label: '순서', type: 'number' },
      { name: 'isActive', label: '활성화', type: 'checkbox' },
    ],
  },
  'gallery': {
    label: '갤러리',
    fields: [
      { name: 'period', label: '기간', type: 'text', required: true },
      { name: 'weightChange', label: '체중 변화', type: 'text', required: true },
      { name: 'fatChange', label: '체지방 변화', type: 'text', required: true },
      { name: 'beforeImage', label: '비포 이미지', type: 'image' },
      { name: 'afterImage', label: '애프터 이미지', type: 'image' },
      { name: 'description', label: '설명', type: 'textarea' },
      { name: 'order', label: '순서', type: 'number' },
      { name: 'isActive', label: '활성화', type: 'checkbox' },
    ],
  },
  'contact-info': {
    label: '연락처 정보',
    fields: [
      { name: 'type', label: '타입', type: 'contact-type', required: true },
      { name: 'label', label: '레이블', type: 'text', required: true },
      { name: 'value', label: '값', type: 'textarea', required: true },
      { name: 'icon', label: '아이콘', type: 'select' },
      { name: 'order', label: '순서', type: 'number' },
      { name: 'isActive', label: '활성화', type: 'checkbox' },
    ],
  },
  'menu-items': {
    label: '메뉴 항목',
    fields: [
      { name: 'name', label: '이름', type: 'text', required: true },
      { name: 'href', label: '링크', type: 'text', required: true },
      { name: 'order', label: '순서', type: 'number' },
      { name: 'isActive', label: '활성화', type: 'checkbox' },
    ],
  },
  'review-images': {
    label: '리뷰 이미지',
    fields: [
      { name: 'image', label: '리뷰 스크린샷', type: 'image', required: true },
      { name: 'title', label: '제목', type: 'text' },
      { name: 'source', label: '출처 (네이버, 카카오 등)', type: 'text' },
      { name: 'order', label: '순서', type: 'number' },
      { name: 'isActive', label: '활성화', type: 'checkbox' },
    ],
  },
  'floating-buttons': {
    label: '플로팅 버튼',
    fields: [
      { name: 'type', label: '버튼 타입', type: 'floating-button-type', required: true },
      { name: 'label', label: '버튼 레이블', type: 'text', required: true },
      { name: 'href', label: '링크 URL', type: 'text', required: true },
      { name: 'bgColor', label: '배경색', type: 'color-select', required: true },
      { name: 'textColor', label: '텍스트색', type: 'text-color-select', required: true },
      { name: 'order', label: '순서', type: 'number' },
      { name: 'isActive', label: '활성화', type: 'checkbox' },
    ],
  },
}

const iconOptions = [
  'FiTarget', 'FiTrendingUp', 'FiAward', 'FiHeart', 'FiDroplet', 'FiZap', 'FiStar',
  'FiPhone', 'FiMail', 'FiMapPin', 'FiClock', 'FiMessageSquare', 'FiInstagram',
]

const facilityTypes = [
  { value: 'gym', label: '민죠이짐' },
  { value: 'care', label: '민죠이케어' },
]

const contactTypes = [
  { value: 'phone', label: '전화' },
  { value: 'email', label: '이메일' },
  { value: 'address', label: '주소' },
  { value: 'hours', label: '영업시간' },
  { value: 'kakao', label: '카카오톡' },
  { value: 'instagram', label: '인스타그램' },
]

const floatingButtonTypes = [
  { value: 'kakao', label: '카카오톡 상담' },
  { value: 'naver', label: '네이버 예약' },
  { value: 'phone', label: '전화하기' },
  { value: 'inquiry', label: '상담접수' },
]

const bgColorOptions = [
  { value: 'bg-[#FEE500]', label: '카카오 노랑' },
  { value: 'bg-[#03C75A]', label: '네이버 초록' },
  { value: 'bg-primary', label: '기본 핑크' },
  { value: 'bg-primary-dark', label: '진한 핑크' },
  { value: 'bg-gym', label: '짐 오렌지' },
  { value: 'bg-white', label: '흰색' },
  { value: 'bg-gray-800', label: '진한 회색' },
]

const textColorOptions = [
  { value: 'text-white', label: '흰색' },
  { value: 'text-[#3C1E1E]', label: '카카오 갈색' },
  { value: 'text-primary-dark', label: '진한 핑크' },
  { value: 'text-gray-800', label: '진한 회색' },
]

// 사이드바 메뉴 (카테고리별 그룹화)
const sidebarMenuGroups = [
  {
    title: '고객 관리',
    items: [
      { id: 'inquiries', label: '상담 문의', icon: FiMessageSquare, desc: '고객 문의 확인' },
    ],
  },
  {
    title: '메인 페이지',
    items: [
      { id: 'hero-content', label: '메인 배너', icon: FiHome, desc: '첫 화면 배너' },
      { id: 'hero-stats', label: '실적 통계', icon: FiActivity, desc: '500+ 회원 등' },
      { id: 'about-features', label: '브랜드 특징', icon: FiGrid, desc: '민죠이만의 특별함' },
      { id: 'review-images', label: '리뷰 이미지', icon: FiImage, desc: '고객 후기 스크린샷' },
    ],
  },
  {
    title: '민죠이짐',
    items: [
      { id: 'gym-programs', label: 'PT 프로그램', icon: FiTarget, desc: '다이어트, 힙업 등' },
      { id: 'gym-targets', label: '추천 대상', icon: FiUser, desc: '이런 분께 추천' },
    ],
  },
  {
    title: '민죠이케어',
    items: [
      { id: 'care-services', label: '케어 서비스', icon: FiHeart, desc: '순환, 탄력, 스파' },
    ],
  },
  {
    title: '공통 콘텐츠',
    items: [
      { id: 'facilities', label: '시설 소개', icon: FiSettings, desc: '짐/케어 시설 사진' },
      { id: 'gallery', label: '비포&애프터', icon: FiImage, desc: '변화 사진' },
    ],
  },
  {
    title: '사이트 설정',
    items: [
      { id: 'floating-buttons', label: '빠른 연락 버튼', icon: FiPhone, desc: '카톡, 네이버, 전화' },
      { id: 'contact-info', label: '연락처 정보', icon: FiMapPin, desc: '주소, 전화번호' },
      { id: 'menu-items', label: '상단 메뉴', icon: FiList, desc: '네비게이션' },
    ],
  },
]

// 플랫 메뉴 목록 (헤더 타이틀 표시용)
const allMenuItems = sidebarMenuGroups.flatMap(group => group.items)

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('inquiries')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // 문의 관련 상태
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [adminName, setAdminName] = useState('')
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)

  // 콘텐츠 관련 상태
  const [contentItems, setContentItems] = useState<ContentItem[]>([])
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState<Record<string, unknown>>({})
  const [uploadingField, setUploadingField] = useState<string | null>(null)
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({})

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

  const fetchContent = useCallback(async (type: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/content?type=${type}`)
      if (!response.ok) throw new Error('Failed to fetch')

      const data = await response.json()
      setContentItems(data.items)
    } catch {
      console.error('Failed to fetch content')
      setContentItems([])
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

  useEffect(() => {
    if (activeTab === 'inquiries') {
      fetchInquiries()
    } else {
      fetchContent(activeTab)
    }
    setEditingItem(null)
    setIsCreating(false)
    setFormData({})
  }, [activeTab, fetchInquiries, fetchContent])

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

  const handleDeleteInquiry = async (id: string) => {
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

  const handleCreateContent = async () => {
    try {
      const processedData = { ...formData }

      // features 필드 처리 (쉼표로 구분된 문자열을 배열로)
      if (activeTab === 'care-services' && typeof processedData.features === 'string') {
        processedData.features = (processedData.features as string).split(',').map(f => f.trim()).filter(f => f)
      }

      // order를 숫자로 변환
      if (processedData.order !== undefined) {
        processedData.order = parseInt(processedData.order as string) || 0
      }

      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: activeTab, data: processedData }),
      })

      if (!response.ok) throw new Error('Failed to create')

      await fetchContent(activeTab)
      setIsCreating(false)
      setFormData({})
    } catch {
      console.error('Failed to create content')
      alert('생성 중 오류가 발생했습니다.')
    }
  }

  const handleUpdateContent = async () => {
    if (!editingItem) return

    try {
      const processedData = { ...formData }

      // features 필드 처리
      if (activeTab === 'care-services' && typeof processedData.features === 'string') {
        processedData.features = (processedData.features as string).split(',').map(f => f.trim()).filter(f => f)
      }

      // order를 숫자로 변환
      if (processedData.order !== undefined) {
        processedData.order = parseInt(processedData.order as string) || 0
      }

      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: activeTab, id: editingItem.id, data: processedData }),
      })

      if (!response.ok) throw new Error('Failed to update')

      await fetchContent(activeTab)
      setEditingItem(null)
      setFormData({})
    } catch {
      console.error('Failed to update content')
      alert('수정 중 오류가 발생했습니다.')
    }
  }

  const handleDeleteContent = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    try {
      const response = await fetch(`/api/content?type=${activeTab}&id=${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete')

      await fetchContent(activeTab)
    } catch {
      console.error('Failed to delete content')
      alert('삭제 중 오류가 발생했습니다.')
    }
  }

  const handleImageUpload = async (fieldName: string, file: File) => {
    setUploadingField(fieldName)
    try {
      const formDataUpload = new FormData()
      formDataUpload.append('file', file)
      formDataUpload.append('folder', activeTab)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || '업로드 실패')
      }

      const result = await response.json()
      setFormData({ ...formData, [fieldName]: result.url })
    } catch (error) {
      console.error('Upload error:', error)
      alert(error instanceof Error ? error.message : '이미지 업로드 중 오류가 발생했습니다.')
    } finally {
      setUploadingField(null)
    }
  }

  const handleRemoveImage = (fieldName: string) => {
    setFormData({ ...formData, [fieldName]: '' })
    if (fileInputRefs.current[fieldName]) {
      fileInputRefs.current[fieldName]!.value = ''
    }
  }

  const startEditing = (item: ContentItem) => {
    setEditingItem(item)
    setIsCreating(false)

    const data: Record<string, unknown> = {}
    const config = contentTypeConfig[activeTab]

    if (config) {
      config.fields.forEach(field => {
        if (field.name === 'features' && Array.isArray(item[field.name])) {
          data[field.name] = (item[field.name] as string[]).join(', ')
        } else {
          data[field.name] = item[field.name]
        }
      })
    }

    setFormData(data)
  }

  const startCreating = () => {
    setIsCreating(true)
    setEditingItem(null)

    const initialData: Record<string, unknown> = {}
    const config = contentTypeConfig[activeTab]

    if (config) {
      config.fields.forEach(field => {
        if (field.type === 'checkbox') {
          initialData[field.name] = true
        } else if (field.type === 'number') {
          initialData[field.name] = 0
        } else {
          initialData[field.name] = ''
        }
      })
    }

    setFormData(initialData)
  }

  const cancelEdit = () => {
    setEditingItem(null)
    setIsCreating(false)
    setFormData({})
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

  const renderFormField = (field: { name: string; label: string; type: string; required?: boolean }) => {
    const value = formData[field.name]

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            value={(value as string) || ''}
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
            rows={3}
            required={field.required}
          />
        )
      case 'checkbox':
        return (
          <input
            type="checkbox"
            checked={(value as boolean) || false}
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.checked })}
            className="w-5 h-5 rounded text-primary focus:ring-primary"
          />
        )
      case 'number':
        return (
          <input
            type="number"
            value={(value as number) || 0}
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
          />
        )
      case 'select':
        return (
          <select
            value={(value as string) || ''}
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
            required={field.required}
          >
            <option value="">선택하세요</option>
            {iconOptions.map((icon) => (
              <option key={icon} value={icon}>{icon}</option>
            ))}
          </select>
        )
      case 'facility-type':
        return (
          <select
            value={(value as string) || ''}
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
            required={field.required}
          >
            <option value="">선택하세요</option>
            {facilityTypes.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        )
      case 'contact-type':
        return (
          <select
            value={(value as string) || ''}
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
            required={field.required}
          >
            <option value="">선택하세요</option>
            {contactTypes.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        )
      case 'floating-button-type':
        return (
          <select
            value={(value as string) || ''}
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
            required={field.required}
          >
            <option value="">선택하세요</option>
            {floatingButtonTypes.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        )
      case 'color-select':
        return (
          <select
            value={(value as string) || ''}
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
            required={field.required}
          >
            <option value="">선택하세요</option>
            {bgColorOptions.map((color) => (
              <option key={color.value} value={color.value}>{color.label}</option>
            ))}
          </select>
        )
      case 'text-color-select':
        return (
          <select
            value={(value as string) || ''}
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
            required={field.required}
          >
            <option value="">선택하세요</option>
            {textColorOptions.map((color) => (
              <option key={color.value} value={color.value}>{color.label}</option>
            ))}
          </select>
        )
      case 'image':
        return (
          <div className="space-y-2">
            {value && typeof value === 'string' ? (
              <div className="relative inline-block">
                <Image
                  src={value}
                  alt="Preview"
                  width={200}
                  height={200}
                  className="rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(field.name)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                >
                  <FiX size={14} />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRefs.current[field.name]?.click()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  uploadingField === field.name
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-300 hover:border-primary hover:bg-gray-50'
                }`}
              >
                {uploadingField === field.name ? (
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
                    <p className="text-sm text-gray-500">업로드 중...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <FiUpload size={32} className="text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">클릭하여 이미지 업로드</p>
                    <p className="text-xs text-gray-400 mt-1">JPG, PNG, GIF, WEBP (최대 10MB)</p>
                  </div>
                )}
              </div>
            )}
            <input
              ref={(el) => { fileInputRefs.current[field.name] = el }}
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleImageUpload(field.name, file)
              }}
              className="hidden"
            />
          </div>
        )
      default:
        return (
          <input
            type="text"
            value={(value as string) || ''}
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
            required={field.required}
          />
        )
    }
  }

  const renderContentForm = () => {
    const config = contentTypeConfig[activeTab]
    if (!config) return null

    return (
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {isCreating ? '새 항목 추가' : '항목 수정'}
          </h3>
          <button onClick={cancelEdit} className="text-gray-500 hover:text-gray-700">
            <FiX size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {config.fields.map((field) => (
            <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {renderFormField(field)}
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={cancelEdit}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            취소
          </button>
          <button
            onClick={isCreating ? handleCreateContent : handleUpdateContent}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center space-x-2"
          >
            <FiSave />
            <span>{isCreating ? '생성' : '저장'}</span>
          </button>
        </div>
      </div>
    )
  }

  const renderContentList = () => {
    const config = contentTypeConfig[activeTab]
    if (!config) return null

    return (
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-semibold">{config.label} 목록</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => fetchContent(activeTab)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="새로고침"
            >
              <FiRefreshCw className={isLoading ? 'animate-spin' : ''} />
            </button>
            <button
              onClick={startCreating}
              className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center space-x-1"
            >
              <FiPlus />
              <span>추가</span>
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : contentItems.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <FiInbox size={48} className="mx-auto mb-4 opacity-50" />
            <p>등록된 항목이 없습니다.</p>
          </div>
        ) : (
          <div className="divide-y">
            {contentItems.map((item) => (
              <div
                key={item.id}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">
                        {(item.title as string) || (item.name as string) || (item.label as string) || (item.value as string) || item.id}
                      </span>
                      {item.isActive === false && (
                        <span className="text-xs px-2 py-0.5 bg-gray-200 rounded-full text-gray-600">
                          비활성
                        </span>
                      )}
                      {typeof item.type === 'string' && item.type && (
                        <span className="text-xs px-2 py-0.5 bg-blue-100 rounded-full text-blue-600">
                          {item.type}
                        </span>
                      )}
                    </div>
                    {typeof item.description === 'string' && item.description && (
                      <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                        {item.description}
                      </p>
                    )}
                    {typeof item.subtitle === 'string' && item.subtitle && (
                      <p className="text-sm text-gray-500 mt-1">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <span className="text-xs text-gray-400">순서: {item.order as number || 0}</span>
                    <button
                      onClick={() => startEditing(item)}
                      className="p-2 hover:bg-blue-100 rounded-lg text-blue-600"
                      title="수정"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDeleteContent(item.id)}
                      className="p-2 hover:bg-red-100 rounded-lg text-red-600"
                      title="삭제"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  const renderInquiriesContent = () => (
    <>
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
                      onClick={() => handleDeleteInquiry(selectedInquiry.id)}
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
    </>
  )

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300 flex-shrink-0`}>
        <div className="p-4 border-b flex items-center justify-between">
          {sidebarOpen && (
            <h1 className="text-xl font-bold gradient-text">민죠이 관리자</h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <FiMenu />
          </button>
        </div>

        <nav className="p-2 space-y-1 overflow-y-auto max-h-[calc(100vh-80px)]">
          {sidebarMenuGroups.map((group, groupIndex) => (
            <div key={group.title} className={groupIndex > 0 ? 'pt-3' : ''}>
              {sidebarOpen && (
                <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {group.title}
                </div>
              )}
              {!sidebarOpen && groupIndex > 0 && (
                <div className="border-t border-gray-200 my-2"></div>
              )}
              <div className="space-y-1">
                {group.items.map((menu) => (
                  <button
                    key={menu.id}
                    onClick={() => setActiveTab(menu.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                      activeTab === menu.id
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                    title={!sidebarOpen ? `${menu.label}: ${menu.desc}` : undefined}
                  >
                    <menu.icon size={18} className="flex-shrink-0" />
                    {sidebarOpen && (
                      <div className="text-left">
                        <div className="text-sm font-medium">{menu.label}</div>
                        <div className="text-xs text-gray-400">{menu.desc}</div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {allMenuItems.find(m => m.id === activeTab)?.label || '관리자'}
              </h1>
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

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === 'inquiries' ? (
            renderInquiriesContent()
          ) : (
            <>
              {(editingItem || isCreating) && renderContentForm()}
              {renderContentList()}
            </>
          )}
        </main>
      </div>
    </div>
  )
}
