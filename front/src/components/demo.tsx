export const DemoElement = ({id, description, datetime}: {
    id: string;
    description: string;
    datetime: string;
}) => {
    return (
        <div className="py-3">
            <h3>{`id: ${id}`}</h3>
            <p>{`description: ${description}`}</p>
            <p>{`datetime: ${datetime}`}</p>
        </div>
    )
}