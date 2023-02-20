import prisma from "~/lib/db.server";
export const loader = async (data) => await prisma.transaction.create({
  data
})
export default function AddNewAccount() {
  return (
    <div>
      <h3>Add New Account</h3>
      <div>
        <form >
          <label>
            Name:
            <input type="text" />
          </label>
          <label>
            Type:
            <input type="text" />
          </label>
          <button>
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
