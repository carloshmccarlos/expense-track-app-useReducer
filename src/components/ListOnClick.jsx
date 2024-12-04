export function ListOnClick({ onClick, className, children }) {
    return (
        <li onClick={onClick} className={className}>
            {children}
        </li>
    );
}