

export default function SubmitButton({ label ,onClick}) {
  return (
    <button className="
            w-full
            bg-gray-400
            text-2xl
            font-bold
            py-1
            px-10
            m-2
            rounded-lg"
      
      onClick={onClick}
    >
      {label}
    </button>
  );
}


function user_signup(){
  
}
