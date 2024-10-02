import React, { useState } from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

// Các biến thể màu của ngôi sao (default, destructive, yellow)
const ratingVariants = {
  default: {
    star: 'text-foreground',
    emptyStar: 'text-muted-foreground'
  },
  destructive: {
    star: 'text-red-500',
    emptyStar: 'text-red-200'
  },
  yellow: {
    star: 'text-yellow-500',
    emptyStar: 'text-yellow-200'
  }
}

interface RatingsProps extends React.HTMLAttributes<HTMLDivElement> {
  rating?: number // Giá trị đánh giá ban đầu hoặc giá trị hiển thị
  totalStars?: number // Số lượng sao tối đa (mặc định là 5)
  size?: number // Kích thước của mỗi ngôi sao
  fill?: boolean // Có tô đầy màu sao hay chỉ hiển thị viền
  Icon?: React.ReactElement // Icon sử dụng làm sao (mặc định là Star)
  variant?: keyof typeof ratingVariants // Biến thể màu của sao
  onRatingChange?: (rating: number) => void // Callback khi người dùng thay đổi đánh giá
  interactive?: boolean // Quy định xem người dùng có thể click để thay đổi hay không
}

const Ratings = ({ rating = 0, interactive = false, totalStars = 5, ...props }: RatingsProps) => {
  // Tách `totalStars` ra khỏi `props` để tránh truyền nó vào phần tử HTML
  const { size = 20, fill = true, Icon = <Star />, variant = 'default', onRatingChange, ...rest } = props

  const [currentRating, setCurrentRating] = useState(rating)

  // Hàm để xử lý khi người dùng click vào ngôi sao
  const handleRating = (newRating: number) => {
    if (!interactive) return // Nếu không phải chế độ tương tác, không làm gì cả
    setCurrentRating(newRating)
    if (onRatingChange) {
      onRatingChange(newRating)
    }
  }

  const fullStars = Math.floor(currentRating)
  const partialStar =
    currentRating % 1 > 0 ? (
      <PartialStar
        fillPercentage={currentRating % 1}
        size={size}
        className={cn(ratingVariants[variant].star)}
        Icon={Icon}
      />
    ) : null

  return (
    <div className={cn('flex items-center gap-0.5')} {...rest}>
      {/* Hiển thị các sao đầy */}
      {[...Array(fullStars)].map((_, i) => (
        <div
          key={i}
          onClick={() => handleRating(i + 1)}
          className={interactive ? 'cursor-pointer' : ''}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {React.cloneElement(Icon, {
            size,
            className: cn(fill ? 'fill-current' : 'fill-transparent', ratingVariants[variant].star)
          })}
        </div>
      ))}

      {/* Hiển thị sao một phần nếu có */}
      {partialStar && (
        <div
          onClick={() => handleRating(fullStars + 1)}
          className={interactive ? 'cursor-pointer' : ''}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {partialStar}
        </div>
      )}

      {/* Hiển thị các sao trống */}
      {[...Array(totalStars - fullStars - (partialStar ? 1 : 0))].map((_, i) => (
        <div
          key={i + fullStars + 1}
          onClick={() => handleRating(fullStars + i + 1 + (partialStar ? 1 : 0))}
          className={interactive ? 'cursor-pointer' : ''}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {React.cloneElement(Icon, {
            size,
            className: cn(ratingVariants[variant].emptyStar)
          })}
        </div>
      ))}
    </div>
  )
}

// Component `PartialStar` hiển thị một phần ngôi sao khi giá trị `rating` không phải số nguyên
interface PartialStarProps {
  fillPercentage: number // Tỷ lệ phần trăm của sao cần tô màu
  size: number // Kích thước của ngôi sao
  className?: string // Các lớp CSS
  Icon: React.ReactElement // Icon làm sao
}

const PartialStar = ({ fillPercentage, size, className, Icon }: PartialStarProps) => {
  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `${size}px`,
        height: `${size}px`,
        lineHeight: 0 // Đảm bảo không có khoảng trắng giữa các phần tử
      }}
    >
      {/* Hiển thị ngôi sao trống (fill-transparent) */}
      {React.cloneElement(Icon, {
        size,
        className: cn('fill-transparent', className)
      })}
      {/* Hiển thị phần đã tô màu của sao */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${fillPercentage * 100}%`,
          height: '100%',
          overflow: 'hidden'
        }}
      >
        {React.cloneElement(Icon, {
          size,
          className: cn('fill-current', className)
        })}
      </div>
    </div>
  )
}

export { Ratings }
