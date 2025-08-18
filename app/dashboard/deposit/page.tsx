import Deposit from "../../../components/Deposit";


export default function page() {
  return (
    <div>
      <Deposit/>
    </div>
  )
  
}
console.log('typeof Deposit:', typeof Deposit); // should be "function"
