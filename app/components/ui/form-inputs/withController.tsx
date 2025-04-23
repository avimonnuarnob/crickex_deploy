import {
  useController,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

type WithControllerProps<
  InputProps extends object,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  control: Control<TFieldValues>;
  name: TName;
} & InputProps;

export function withController<InputProps extends object>(
  Component: React.ComponentType<InputProps>
) {
  function WrappedComponent<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
  >({
    name,
    control,
    ...props
  }: WithControllerProps<InputProps, TFieldValues, TName>) {
    const {
      field,
      fieldState: { error },
    } = useController({ name, control });

    return <Component {...field} {...(props as InputProps)} error={error} />;
  }

  WrappedComponent.displayName = `withController(${
    (Component.displayName ?? Component.name) || "Component"
  })`;

  return WrappedComponent;
}
