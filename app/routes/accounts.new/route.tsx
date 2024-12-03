import { zodResolver } from "@hookform/resolvers/zod";
import { ActionArgs, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { z } from "zod";
import { Button } from "../../components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import prisma from "../../lib/db.server";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  type: z.string().min(1, { message: "Type is required" }),
});

export async function action({ request }: ActionArgs) {
  console.log("action");
  const formData = await request.formData();
  const name = formData.get("name");
  const type = formData.get("type");

  if (typeof name !== "string" || name.length === 0) {
    return new Response("Name is required", { status: 400 });
  }
  if (typeof type !== "string" || type.length === 0) {
    return new Response("Type is required", { status: 400 });
  }

  await prisma.account.create({
    data: {
      name,
      type,
    },
  });

  return redirect("/accounts");
};

export default function AddNewAccount() {
  // for displaying error messages
  const actionData = useActionData();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="h-full w-full justify-center p-4">
      <h3 className="font-semibold text-gray-600">Add New Account</h3>
      <Form method="post" action="/accounts/new?index" onSubmit={form.handleSubmit(onSubmit)}>
        <input type="text" placeholder="Account Name" {...form.register("name")} />
        <input type="text" placeholder="Account Type" {...form.register("type")} />
        <input type="submit" value="Create"/>
      </Form>
    </div>
  );
}

{/* <Form {...form}>
      <FormRemix method="post" action="/accounts/new" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Name</FormLabel>
              <FormControl>
                <Input placeholder="Account Name" {...field} />
              </FormControl>
              <FormDescription>
                Enter the name of the account.
              </FormDescription>
              {actionData?.error && <FormMessage>{actionData.error}</FormMessage>}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Type</FormLabel>
              <FormControl>
                <Input placeholder="Account Type" {...field} />
              </FormControl>
              <FormDescription>
                Enter the type of the account.
              </FormDescription>
              {actionData?.error && <FormMessage>{actionData.error}</FormMessage>}
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </FormRemix>
    </Form> */}