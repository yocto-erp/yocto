import { hasText } from "../../util";

export interface FormErrorProps {
  message?: string | null;
}

export function FormError(props: FormErrorProps) {
  return props.message && hasText(props.message) ? (
    <div className="invalid-feedback">{props.message}</div>
  ) : null;
}

export default FormError;
