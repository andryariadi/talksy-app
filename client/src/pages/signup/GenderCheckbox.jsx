const GenderCheckbox = () => {
  return (
    <div className="flex">
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text text-xs text-neutral-100">Male</span>
          <input type="checkbox" className="checkbox checkbox-secondary border-secondary" />
        </label>
      </div>
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer`}>
          <span className="label-text text-xs text-neutral-100">Female</span>
          <input type="checkbox" className="checkbox checkbox-secondary border-secondary" />
        </label>
      </div>
    </div>
  );
};
export default GenderCheckbox;
