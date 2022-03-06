export interface IButton {
    onClick: () => void;
    mode?: 'primary' | 'secondary';
    disabled: boolean;
}