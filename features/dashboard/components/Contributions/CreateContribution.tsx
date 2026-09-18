"use client";

import { useState, useEffect, useRef, useActionState } from "react";
import Button from "@/ui/components/Button";
import Form from "next/form";
import { createContribution } from "../../services/createContribution";
import { CategoryType, IssueType } from "@/generated/prisma";

type Props = {
  inviteId: number;
};

export default function CreateContribution({ inviteId }: Props) {
  const [state, dispatch, pending] = useActionState(createContribution, {
    ok: false,
    error: undefined,
  });

  const [formOpen, setFormOpen] = useState(false);
  const [prevState, setPrevState] = useState(state);

  if (state !== prevState) {
    setPrevState(state);
    if (state.ok) setFormOpen(false);
  }

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formOpen) {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [formOpen]);

  const CATEGORIES = Object.values(CategoryType);
  const ISSUE_TYPES = Object.values(IssueType);

  return (
    <section>
      {formOpen && (
        <Form
          ref={formRef}
          action={dispatch}
          className="flex max-w-md flex-col gap-4 px-[1px]"
        >
          <h2>
            {state.error
              ? state.error + " - Try again!"
              : "What are you bringing?"}
          </h2>
          <input type="hidden" name="invite" value={inviteId} />
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-medium">
              Name of Dish/Item
            </label>
            <input
              className="input-field"
              type="text"
              id="name"
              name="name"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="category" className="font-medium">
              Category
            </label>
            <select
              id="category"
              name="category"
              required
              className="input-field"
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.toLowerCase()}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="servings" className="font-medium">
              Servings (Optional)
            </label>
            <input
              type="number"
              id="servings"
              name="servings"
              min="1"
              className="input-field"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium">Contains (Dietary/Allergens)</label>
            <div className="grid grid-cols-2 gap-2">
              {ISSUE_TYPES.map((issue) => (
                <label
                  key={issue}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <input type="checkbox" name="contains" value={issue} />
                  <span className="text-sm">
                    {issue.toLowerCase() === "animalbased"
                      ? "other animal based "
                      : issue.toLowerCase()}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="font-medium">
              Description (Optional)
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="input-field"
            ></textarea>
          </div>
          <div className="mt-2 flex gap-3">
            <Button type="submit" disabled={pending}>
              {pending ? "Saving contribution..." : "Save Contribution"}
            </Button>

            <Button
              disabled={pending}
              type="button"
              onClick={() => setFormOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </Form>
      )}
      {!formOpen && (
        <div className="flex justify-center">
          <Button
            variant="secondary"
            onClick={() => {
              setFormOpen(true);
            }}
          >
            Bring something
          </Button>
        </div>
      )}
    </section>
  );
}
