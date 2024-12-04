export interface RegionsProps {
  regions?: Region[]
  onRegionClick?: (region: Region) => void
  onRegionUpdate?: (region: Region) => void
}

export interface Region {
  id: string
  start: number
  end: number
  color?: string
  content?: React.ReactNode
}

export const Regions = ({
  regions = [],
  onRegionClick,
  onRegionUpdate
}: RegionsProps) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {regions.map(region => (
        <Region key={region.id} {...region} />
      ))}
    </div>
  )
}