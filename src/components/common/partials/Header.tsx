import { css } from "../../../../styled-system/css"
import { hstack } from "../../../../styled-system/patterns"

export const Header = () => {
	return (
		<header className={hstack({height: "80px", padding: "24px", backgroundColor: "bgWhite"})}>
			<div className={css({ color: "fontBlack" ,fontFamily: "Inter", fontSize: "3xl", fontWeight: "bold"})}><span className={css({color: "fontRed"})}>Re</span>collect</div>
		</header>
	)
}