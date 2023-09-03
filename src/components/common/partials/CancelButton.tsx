import { FC } from "react"
import { css } from "../../../../styled-system/css"

type CancelButtonProps = {
	content: {
		handleOpen: () => void
	}
}
export const CancelButton: FC<CancelButtonProps> = ({content}) => {
	const { handleOpen } = content
	return (
		<button
			className={css({
				cursor: 'pointer',
				border: 'none',
				backgroundColor: 'transparent',
				color: 'gray',
				fontSize: 'sm',
				fontWeight: 'bold',
				// border: "1px solid",
			})}
			onClick={handleOpen}
		>
			キャンセル
		</button>
	)
}