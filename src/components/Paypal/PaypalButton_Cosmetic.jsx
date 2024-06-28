import { useNavigate } from 'react-router-dom'

export function PayPalBtnCosmetic() {
  const navigate = useNavigate()

  return (
        <button type="button" onClick={() => navigate('/signin')} className="bg-[#0070ba] rounded-full text-white py-2 hover:brightness-95">
            <b className="text-xl"><i>PayPal</i></b> <label className="text-md">Subscribe</label> 
        </button>
    );
}

export default PayPalBtnCosmetic;