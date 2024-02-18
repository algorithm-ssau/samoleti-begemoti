interface CardProps {
    title: string,
    description?: string,
    id: string,
    onClick: (id: string) => void,
}

export function Card(props: CardProps) {
    return (<div onClick={() => props.onClick(props.id)}>
        <h3>{props.title}</h3>
        <p>{ props.description} </p>
    </div>)
}