import { useMutateOpenAIResponse } from '@/api/hooks/open_ai/useMutateOpenAi'

const prompt = `
    下記文章を読み、その人の特性を分析し、マークダウン形式で出力して。
    なお、文章のフォーマットは以下のようなものとする

    フォーマット例:「
        - **責任感**: 美化委員として学校清掃に取り組み、地域ボランティアに自発的に参加する姿勢から、責任感が強いことが分かります。\n- **努力家**: 自由研究での入賞や清掃活動での頑張りから、努力を惜しまない姿勢が伺えます。\n
    」

    文章:「
        プログラミングサークルの活動の一環として秋に新歓活動を行いました。新勧プロジェクトと称して、どのように人を集めるのか、広報の手法、新メンバー歓迎イベントなどを話し合い、一つ一つ実行していきました。自分にとっては不慣れなインスタグラムを使って、自ら進んでサークルの活動の様子を宣伝したり、サークルのメンバーにも協力を促したりしてなんとか新歓活動を進めていきました。最終的には新しいメンバーに入ってもらえたのでほっとしていました。
    」
`
export default function OpenAi() {
  const { openaiResponseMutation } = useMutateOpenAIResponse()

  const onSubmitOpenAi = () => {
    openaiResponseMutation.mutate({ id: 0, prompt })
  }

  return (
    <>
      <div>
        <button onClick={onSubmitOpenAi}>OpenAi</button>
      </div>
    </>
  )
}
