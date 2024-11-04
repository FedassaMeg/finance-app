export default function Calculator() {
  return (
    <div>
      <h3>Loan Calculator</h3>
      <div>
        <form>
          <input type="number" placeholder="Amount" />
          <fieldset>
            <legend>Loan Term</legend>
            <input type="number" placeholder="Years" />
            <input type="number" placeholder="Months" />
          </fieldset>
          <input type="number" placeholder="Rate" />
          <input type="text" placeholder="Compount" />
          <input type="text" placeholder="Pay Back" />
        </form>
      </div>
    </div>
  );
}
