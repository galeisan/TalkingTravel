export interface IButton {
    id?: string;
    onClick: () => void;
    mode?: 'primary' | 'secondary';
    disabled: boolean;
}