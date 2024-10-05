import AirConditionerIcon from '@/components/icon/air-conditioner-icon'
import BedLinensIcon from '@/components/icon/bed-linens-icon'
import CameraIcon from '@/components/icon/camera-icon'
import CarbonMonoxideAlarmIcon from '@/components/icon/carbon-monoxide-alarm-icon'
import ClothingStorageIcon from '@/components/icon/clothing-storage-icon'
import DryerIcon from '@/components/icon/dryer-icon'
import EssentialsIcon from '@/components/icon/essentials-icon'
import HairDryerIcon from '@/components/icon/hair-dryer-icon'
import HangersIcon from '@/components/icon/hangers-icon'
import HeatingIcon from '@/components/icon/heating-icon'
import HotWaterIcon from '@/components/icon/hot-water-icon'
import HotWaterKettleIcon from '@/components/icon/hot-water-kettle-icon'
import KitchenIcon from '@/components/icon/kitchen-icon'
import LockboxIcon from '@/components/icon/lockbox-icon'
import MiniFridgeIcon from '@/components/icon/mini-fridge-icon'
import ParkingSpaceIcon from '@/components/icon/parking-space-icon'
import SelfCheckInIcon from '@/components/icon/self-check-in-icon'
import ShampooIcon from '@/components/icon/shampoo-icon'
import ShowerGelIcon from '@/components/icon/shower-gel-icon'
import SmokeAlarmIcon from '@/components/icon/smoke-alarm-icon'
import TiviIcon from '@/components/icon/tivi-icon'
import WashingMachineIcon from '@/components/icon/washing-machine-icon'
import WifiIcon from '@/components/icon/wifi-icon'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import React from 'react'

interface AmenitiesProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  // onClose: () => void
}

const AmenitiesDialog: React.FC<AmenitiesProps> = ({ open, onOpenChange }) => {
  const bathroomAmenities = [
    {
      id: 1,
      name: 'Máy sấy tóc',
      icon: <HairDryerIcon />
    },
    {
      id: 2,
      name: 'Dầu gội',
      icon: <ShampooIcon />
    },
    {
      id: 3,
      name: 'Nước nóng',
      icon: <HotWaterIcon />
    },
    {
      id: 4,
      name: 'Sữa tắm',
      icon: <ShowerGelIcon />
    }
  ]

  const bedroomAndLaundryAmenities = [
    {
      id: 1,
      name: 'Máy giặt',
      icon: <WashingMachineIcon />
    },
    {
      id: 2,
      name: 'Tiện nghi thiết yếu',
      icon: <EssentialsIcon />
    },
    {
      id: 3,
      name: 'Móc treo quần áo',
      icon: <HangersIcon />
    },
    {
      id: 4,
      name: 'Bộ chăn ga gối',
      icon: <BedLinensIcon />
    },
    {
      id: 5,
      name: 'Nơi để quần áo',
      icon: <ClothingStorageIcon />
    }
  ]

  const entertainmentAmenities = [
    {
      id: 1,
      name: 'TV',
      icon: <TiviIcon />
    }
  ]

  const heatingAndCoolingAmenities = [
    {
      id: 1,
      name: 'Điều hòa nhiệt độ',
      icon: <AirConditionerIcon />
    }
  ]

  const homeSafetyAmenities = [
    {
      id: 1,
      name: 'Chỗ ở có camera an ninh ngoài nhà',
      icon: <CameraIcon />
    }
  ]

  const internetAndOfficeAmenities = [
    {
      id: 1,
      name: 'Wifi',
      icon: <WifiIcon />
    }
  ]

  const kitchenAndDiningAmenities = [
    {
      id: 1,
      name: 'Bếp',
      icon: <KitchenIcon />
    },
    {
      id: 2,
      name: 'Đồ nấu ăn cơ bản',
      icon: <KitchenIcon />
    },
    {
      id: 3,
      name: 'Tủ lạnh mini',
      icon: <MiniFridgeIcon />
    },
    {
      id: 4,
      name: 'Ấm đun nước nóng',
      icon: <HotWaterKettleIcon />
    }
  ]

  const ParkingAndFacilitiesAmenities = [
    {
      id: 1,
      name: 'Chỗ đỗ xe miễn phí tại nơi ở',
      icon: <ParkingSpaceIcon />
    }
  ]

  const services = [
    {
      id: 1,
      name: 'Tự nhận phòng',
      icon: <SelfCheckInIcon />
    },
    {
      id: 2,
      name: 'Hộp khóa',
      icon: <LockboxIcon />
    }
  ]

  const notIncludedAmenities = [
    {
      id: 1,
      name: 'Máy sấy quần áo',
      icon: <DryerIcon />
    },
    {
      id: 2,
      name: 'Máy báo khói',
      icon: <SmokeAlarmIcon />
    },
    {
      id: 3,
      name: 'Máy phát hiện khí CO',
      icon: <CarbonMonoxideAlarmIcon />
    },
    {
      id: 4,
      name: 'Hệ thống sưởi',
      icon: <HeatingIcon />
    }
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='h-full md:max-h-[80vh]'>
        <DialogHeader>
          <DialogTitle className='uppercase'>Nơi này có những gì cho bạn</DialogTitle>
          <DialogDescription>Liên hệ với chủ nhà để trao đổi thêm thông tin</DialogDescription>
        </DialogHeader>

        <div className='overflow-auto'>
          {/* TODO: Tạm thời là data cứng */}
          {/* Phòng tắm */}
          <div className='mb-5'>
            <h2 className='text-base font-semibold mb-2'>Phòng tắm</h2>
            <div className='divide-y text-base'>
              {bathroomAmenities.map((amenity) => (
                <div key={amenity.id} className='py-5 flex justify-start items-center gap-4'>
                  <div>{amenity.icon}</div>
                  <span>{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Phòng ngủ và giặt ủi */}
          <div className='mb-5'>
            <h2 className='text-base font-semibold mb-2'>Phòng ngủ và giặt ủi</h2>
            <div className='divide-y text-base'>
              {bedroomAndLaundryAmenities.map((amenity) => (
                <div key={amenity.id} className='py-5 flex justify-start items-center gap-4'>
                  <div>{amenity.icon}</div>
                  <span>{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Giải trí */}
          <div className='mb-5'>
            <h2 className='text-base font-semibold mb-2'>Giải trí</h2>
            <div className='divide-y text-base'>
              {entertainmentAmenities.map((amenity) => (
                <div key={amenity.id} className='py-5 flex justify-start items-center gap-4'>
                  <div>{amenity.icon}</div>
                  <span>{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Hệ thống sưởi và làm mát */}
          <div className='mb-5'>
            <h2 className='text-base font-semibold mb-2'>Hệ thống sưởi và làm mát</h2>
            <div className='divide-y text-base'>
              {heatingAndCoolingAmenities.map((amenity) => (
                <div key={amenity.id} className='py-5 flex justify-start items-center gap-4'>
                  <div>{amenity.icon}</div>
                  <span>{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>
          {/* An toàn nhà ở */}
          <div className='mb-5'>
            <h2 className='text-base font-semibold mb-2'>An toàn nhà ở</h2>
            <div className='divide-y text-base'>
              {homeSafetyAmenities.map((amenity) => (
                <div key={amenity.id} className='py-5 flex justify-start items-center gap-4'>
                  <div>{amenity.icon}</div>
                  <span>{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Internet và văn phòng */}
          <div className='mb-5'>
            <h2 className='text-base font-semibold mb-2'>Internet và văn phòng</h2>
            <div className='divide-y text-base'>
              {internetAndOfficeAmenities.map((amenity) => (
                <div key={amenity.id} className='py-5 flex justify-start items-center gap-4'>
                  <div>{amenity.icon}</div>
                  <span>{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Đồ dùng nấu bếp và ăn uống */}
          <div className='mb-5'>
            <h2 className='text-base font-semibold mb-2'>Đồ dùng nấu bếp và ăn uống</h2>
            <div className='divide-y text-base'></div>
            {kitchenAndDiningAmenities.map((amenity) => (
              <div key={amenity.id} className='py-5 flex justify-start items-center gap-4'>
                <div>{amenity.icon}</div>
                <span>{amenity.name}</span>
              </div>
            ))}
          </div>
          {/* Chỗ đỗ xe và cơ sở vật chất */}
          <div className='mb-5'>
            <h2 className='text-base font-semibold mb-2'>Chỗ đỗ xe và cơ sở vật chất</h2>
            <div className='divide-y text-base'>
              {ParkingAndFacilitiesAmenities.map((amenity) => (
                <div key={amenity.id} className='py-5 flex justify-start items-center gap-4'>
                  <div>{amenity.icon}</div>
                  <span>{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Dịch vụ */}
          <div className='mb-5'>
            <h2 className='text-base font-semibold mb-2'>Dịch vụ</h2>
            <div className='divide-y text-base'>
              {services.map((amenity) => (
                <div key={amenity.id} className='py-5 flex justify-start items-center gap-4'>
                  <div>{amenity.icon}</div>
                  <span>{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Không bao gồm */}
          <div className='mb-5'>
            <h2 className='text-base font-semibold mb-2'>Không bao gồm</h2>
            <div className='divide-y text-base'>
              {notIncludedAmenities.map((amenity) => (
                <div key={amenity.id} className='py-5 flex justify-start items-center gap-4'>
                  <div>{amenity.icon}</div>
                  <span>{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AmenitiesDialog
