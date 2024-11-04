export default function New() {
  return (
    <div>
      <div>
        <div>
          <span>Income</span>
          <span>$0.00</span>
        </div>
        <div>
          <span>Expense</span>
          <span>$0.00</span>
        </div>
      </div>
      <div>
        <form>
          <input type="text" placeholder="Label" />
          <input type="text" placeholder="Type" />
          <input type="text" placeholder="Account" />
          <input type="number" placeholder="Amount" />
          <button>Add</button>
        </form>
      </div>
      <div>
        <ul>
          <li></li>
        </ul>
      </div>
    </div>
  );
}
