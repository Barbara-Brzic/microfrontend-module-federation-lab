import {Field, FieldLabel} from "ui/Field";
import {Input} from "ui/Input";

interface SearchProps {
    placeholder: string | undefined,
    onChange: (value: string) => void
}

export const Search = ({placeholder, onChange}: SearchProps) => {
    return (
        <Field>
            <FieldLabel>Search Products</FieldLabel>
            <Input placeholder={placeholder} onChange={(e) => onChange(e.target.value)}/>
        </Field>
    )
}