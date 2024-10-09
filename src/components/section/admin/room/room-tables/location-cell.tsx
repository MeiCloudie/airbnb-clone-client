import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { useLocationStore } from '@/store/locationStore'
import { Info } from 'lucide-react'

type LocationCellProps = {
  maViTri: number // maViTri from room data
}

export function LocationCell({ maViTri }: LocationCellProps) {
  const locations = useLocationStore((state) => state.dataAllLocations?.content || []) // Access all locations
  const location = locations.find((loc) => loc.id === maViTri)

  return location ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className='flex justify-start items-center'>
          <Info className='w-4 h-4 me-2' />
          <span>{location.tenViTri}</span>
          {/* Display tenViTri */}
        </TooltipTrigger>
        <TooltipContent>
          <p>{`Location Code: ${maViTri}`}</p> {/* Tooltip shows maViTri */}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <span>{maViTri}</span> // Fallback if no location name found
  )
}
