import {NalysaLogoProps} from "../static";

const NalysaLogo: React.FC<NalysaLogoProps> = props => {
  const width = props.width || 320
  const height = props.height || 100
  const alt = props.alt || 'Nalysa Software-house'

  return (
    <div className={`my-4 relative mx-auto ${props.className}`}
      style={{
        ...props,
        width, height
      }}
    >
      <img
        src="./Nalysa.png"
        alt={alt}
      />
    </div>
  )
}

export default NalysaLogo