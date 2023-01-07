
export const DataHandler = <T,> (
	event : React.ChangeEvent<Element>,
	setState : React.Dispatch<React.SetStateAction<T>>,
	) => {

	const {target} = event;
	
	if(target.nodeName === "INPUT"){
		const { type, name : key, checked, value } = target as HTMLInputElement
		if(type !== "checkbox")
			setState(prev=>({...prev, [key] : value}))
		if(type === "checkbox")
			setState(prev=>({...prev, [key] : checked}))
	}
	if(target.nodeName === "TEXTAREA"){
		const { value, name : key } = target as HTMLTextAreaElement
		setState(prev=>({...prev,[key] : value}))
	}
	if(target.nodeName === "SELECT"){
		const { value, name : key } = target as HTMLSelectElement
		setState(prev=>({...prev,[key] : value}))
	}

}
