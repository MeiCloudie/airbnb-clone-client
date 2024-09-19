import { Category } from '@/types/category.type'
import { NavItem } from '@/types/sidebar.type'

export const categories: Category[] = [
  {
    id: '1',
    name: 'Biểu tượng',
    icon: ''
  },
  {
    id: '2',
    name: 'Nhiệt đới',
    icon: ''
  },
  {
    id: '3',
    name: 'Cabin',
    icon: ''
  },
  {
    id: '4',
    name: 'Bắc Cực',
    icon: ''
  },
  {
    id: '5',
    name: 'Được ưu chuộng',
    icon: ''
  },
  {
    id: '6',
    name: 'Hồ',
    icon: ''
  },
  {
    id: '7',
    name: 'Phòng',
    icon: ''
  },
  {
    id: '8',
    name: 'Khung cảnh tuyệt vời',
    icon: ''
  },
  {
    id: '9',
    name: 'Hồ bơi tuyệt vời',
    icon: ''
  },
  {
    id: '10',
    name: 'Container',
    icon: ''
  },
  {
    id: '11',
    name: 'Luxe',
    icon: ''
  },
  {
    id: '12',
    name: 'Nhà nông trại',
    icon: ''
  },
  {
    id: '13',
    name: 'Nông trại',
    icon: ''
  },
  {
    id: '14',
    name: 'Mới',
    icon: ''
  },
  {
    id: '15',
    name: 'Nhà nhỏ',
    icon: ''
  },
  {
    id: '16',
    name: 'Thiết kế',
    icon: ''
  },
  {
    id: '17',
    name: 'Ven hồ',
    icon: ''
  },
  {
    id: '18',
    name: 'Lâu đài',
    icon: ''
  },
  {
    id: '19',
    name: 'Biệt thự',
    icon: ''
  },
  {
    id: '20',
    name: 'Bãi biển',
    icon: ''
  },
  {
    id: '21',
    name: 'Nông thôn',
    icon: ''
  },
  {
    id: '22',
    name: 'Đảo',
    icon: ''
  },
  {
    id: '23',
    name: 'Bếp của bếp trưởng',
    icon: ''
  },
  {
    id: '24',
    name: 'Nhà không sử dụng điện lưới',
    icon: ''
  },
  {
    id: '25',
    name: 'Nhà mái vòm',
    icon: ''
  },
  {
    id: '26',
    name: 'Casa Particular',
    icon: ''
  },
  {
    id: '27',
    name: 'Khu cắm trại',
    icon: ''
  },
  {
    id: '28',
    name: 'Chơi golf',
    icon: ''
  },
  {
    id: '29',
    name: 'Nhà trên cây',
    icon: ''
  },
  {
    id: '30',
    name: 'Công viên quốc gia',
    icon: ''
  },
  {
    id: '31',
    name: 'Hướng biển',
    icon: ''
  },
  {
    id: '32',
    name: 'Hanok',
    icon: ''
  },
  {
    id: '33',
    name: 'Minsu',
    icon: ''
  },
  {
    id: '34',
    name: 'Nhà khung chữ A',
    icon: ''
  },
  {
    id: '35',
    name: 'Thật ấn tượng!',
    icon: ''
  },
  {
    id: '36',
    name: 'Xe cắm trại',
    icon: ''
  },
  {
    id: '37',
    name: 'Lướt sóng',
    icon: ''
  },
  {
    id: '38',
    name: 'Hang động',
    icon: ''
  },
  {
    id: '39',
    name: 'Thành phố hàng đầu',
    icon: ''
  },
  {
    id: '40',
    name: 'Phục vụ bữa sáng',
    icon: ''
  },
  {
    id: '41',
    name: 'Nhà dưới lòng đất',
    icon: ''
  },
  {
    id: '42',
    name: 'Vườn nho',
    icon: ''
  },
  {
    id: '43',
    name: 'Nhà mang tính lịch sử',
    icon: ''
  },
  {
    id: '44',
    name: 'Trượt tuyết',
    icon: ''
  },
  {
    id: '45',
    name: 'Nhà trên núi',
    icon: ''
  },
  {
    id: '46',
    name: 'Nhà phong cách Cycladic',
    icon: ''
  },
  {
    id: '47',
    name: 'Ryokan',
    icon: ''
  },
  {
    id: '48',
    name: 'Vui chơi',
    icon: ''
  },
  {
    id: '49',
    name: 'Cối xay gió',
    icon: ''
  },
  {
    id: '50',
    name: 'Lều mục đồng',
    icon: ''
  },
  {
    id: '51',
    name: 'Grand piano',
    icon: ''
  },
  {
    id: '52',
    name: 'Lều yurt',
    icon: ''
  },
  {
    id: '53',
    name: 'Sa mạc',
    icon: ''
  },
  {
    id: '54',
    name: 'Tháp',
    icon: ''
  },
  {
    id: '55',
    name: 'Đường trượt tuyết tới thẳng chỗ ở',
    icon: ''
  },
  {
    id: '56',
    name: 'Hỗ trợ người dùng xe lăn',
    icon: ''
  },
  {
    id: '57',
    name: 'Thuyền',
    icon: ''
  },
  {
    id: '58',
    name: 'Nhà thuyền',
    icon: ''
  },
  {
    id: '59',
    name: 'Không gian sáng tạo',
    icon: ''
  },
  {
    id: '60',
    name: 'Dammuso',
    icon: ''
  },
  {
    id: '61',
    name: 'Nhà chỏm nón',
    icon: ''
  },
  {
    id: '62',
    name: 'Riad',
    icon: ''
  }
]

// Old - Chưa handle lại
export type User = {
  id: number
  name: string
  company: string
  role: string
  verified: boolean
  status: string
}

export const users: User[] = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active'
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'WebTech',
    role: 'UI Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Innovate Inc.',
    role: 'Fullstack Developer',
    verified: false,
    status: 'Inactive'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    company: 'TechGuru',
    role: 'Product Manager',
    verified: true,
    status: 'Active'
  },
  {
    id: 6,
    name: 'James Brown',
    company: 'CodeGenius',
    role: 'QA Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Laura White',
    company: 'SoftWorks',
    role: 'UX Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 8,
    name: 'Michael Lee',
    company: 'DevCraft',
    role: 'DevOps Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 9,
    name: 'Olivia Green',
    company: 'WebSolutions',
    role: 'Frontend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 10,
    name: 'Robert Taylor',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active'
  }
]

export type Employee = {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string
  gender: string
  date_of_birth: string // Consider using a proper date type if possible
  street: string
  city: string
  state: string
  country: string
  zipcode: string
  longitude?: number // Optional field
  latitude?: number // Optional field
  job: string
  profile_picture?: string | null // Profile picture can be a string (URL) or null (if no picture)
}

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'User',
    href: '/dashboard/user',
    icon: 'user',
    label: 'user'
  },
  {
    title: 'Employee',
    href: '/dashboard/employee',
    icon: 'employee',
    label: 'employee'
  },
  {
    title: 'Profile',
    href: '/dashboard/profile',
    icon: 'profile',
    label: 'profile'
  },
  {
    title: 'Kanban',
    href: '/dashboard/kanban',
    icon: 'kanban',
    label: 'kanban'
  },
  {
    title: 'Login',
    href: '/',
    icon: 'login',
    label: 'login'
  }
]
