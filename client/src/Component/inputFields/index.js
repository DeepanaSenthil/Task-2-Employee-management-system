export const InputField = ({
  htmlFor,
  label,
  type,
  placeholder,
  name,
  value,
  onChange,
  error = false,
  hintLines,
  required,
  errText = "",
  disabled = false
}) => {
  return (
    <div className="mt-5">
      {label && (
        <label
          className="block font-small text-[14px]"
          htmlFor={htmlFor}
        >
          {required === "true" && <span className="text-red-600">*</span>}
          {label}
        </label>
      )}
      {hintLines && (
        <span className="text-[12px] block mb-2 text-[#7c7676]">
          {hintLines}
        </span>
      )}
      <input
        id={htmlFor}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`mt-1 block w-full px-3 py-2 border rounded-sm shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm ${error ? "border-red-500" : "border-gray-300"
          }`}
      />
      {errText && <p className="text-red-500 text-sm">{errText.toString()}</p>}
    </div>
  );
};


export const InputLabel = ({ htmlFor, required, label, hintLines }) => {
  return (
    <div className="mt-5">
      {label && (
        <label
          className="block text-[18px] font-medium text-gray-700 text"
          htmlFor={htmlFor}
        >
          {required === "true" && <span className="text-red-600">*</span>}
          {label}
        </label>
      )}
      {hintLines && (
        <span className="text-[12px] block mb-2 text-[#7c7676]">
          {hintLines}
        </span>
      )}
    </div>
  );
};