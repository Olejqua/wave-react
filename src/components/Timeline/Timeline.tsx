export interface TimelineProps {
  height?: number
  primaryColor?: string
  secondaryColor?: string
}

export const Timeline = ({
  height = 20,
  primaryColor = '#000',
  secondaryColor = '#555'
}: TimelineProps) => {
  return (
    <div className="w-full" style={{ height }}>
      <canvas className="w-full h-full" />
    </div>
  )
}
