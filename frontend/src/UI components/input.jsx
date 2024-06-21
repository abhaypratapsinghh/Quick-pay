

export default function InputArea({ label, placeholder ,onChange}) {
    return (
        <div className="flex-col my-2 pt-2 text-left">
            <div className="font-medium text-2xl">{label}</div>
            <input className="border w-full h-10 rounded-md my-2" placeholder={placeholder} onChange={onChange}></input>
        </div>
    )
}