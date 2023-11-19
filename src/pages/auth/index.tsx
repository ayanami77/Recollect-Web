import { signIn } from "next-auth/react";

export default function Auth() {
  return (
    <div>
      <h1>Auth</h1>
      <button onClick={()=>signIn()}>サインイン</button>
    </div>
  );
}