import { css } from '../../../../styled-system/css'

type Priod = '幼少期' | '小学生' | '中学生' | '高校生' | '大学生'

type Card = {
  priod: Priod
  title: string
  content: string
}

// type CardProps = {
//   cardPostion: number;
// }

export const Card = () => {
  return (
    <div
      className={css({
        width: '600px',
        height: '370px',
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '38px',
        shadow: 'xl',
      })}
    >
      <label
        className={css({
          width: '350px',
          height: '24px',
          display: 'inline-block',
          mb: '15px',
          fontSize: '2xl',
        })}
      >
        <input
          type='text'
          id='title'
          placeholder='一言タイトル'
          className={css({
            borderBottom: '4px solid',
            borderColor: 'gray',
            outline: 'none',
            fontWeight: 'bold',
          })}
        />
      </label>
      <textarea
        placeholder='どんなあそびをしていた？'
        className={css({
          width: '100%',
          height: '250px',
          borderColor: 'gray',
          mt: '20px',
          outline: 'none',
          resize: 'none',
        })}
      ></textarea>
    </div>
  )
}
