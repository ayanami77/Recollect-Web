import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import { hstack } from '../../../../styled-system/patterns'

type PageTitleProps = {
  title: string
  icon: IconDefinition
}
export const PageTitle: FC<PageTitleProps> = (props) => {
  const { title, icon } = props
  return (
    <h2
      className={hstack({
        px: '12px',
        fontSize: 'xl',
        fontWeight: 'bold',
        gap: '16px',
        md: {
          fontSize: '3xl',
        },
      })}
    >
      <FontAwesomeIcon icon={icon} style={{ width: '36px', height: '36px', color: '#0C4C97' }} />
      {title}
    </h2>
  )
}
