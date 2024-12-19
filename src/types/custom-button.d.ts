interface ICustomButton {
    onClick?: () => void
    type?: "button" | "submit"
    text: string
    className: string
}