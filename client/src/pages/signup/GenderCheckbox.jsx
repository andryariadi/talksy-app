const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected" : ""} `}>
          <span className="label-text text-xs text-neutral-100">Male</span>
          <input type="checkbox" className="checkbox checkbox-secondary border-secondary" checked={selectedGender === "male"} onChange={() => onCheckboxChange("male")} />
        </label>
      </div>
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer  ${selectedGender === "female" ? "selected" : ""}`}>
          <span className="label-text text-xs text-neutral-100">Female</span>
          <input type="checkbox" className="checkbox checkbox-secondary border-secondary" checked={selectedGender === "female"} onChange={() => onCheckboxChange("female")} />
        </label>
      </div>
    </div>
  );
};

// GenderCheckbox.propTypes = {
//   onCheckboxChange: PropTypes.func.isRequired,
//   selectedGender: PropTypes.string.isRequired,
// };

export default GenderCheckbox;
