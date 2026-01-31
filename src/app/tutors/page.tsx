export const dynamic = "force-dynamic";

export default async function TutorsPage() {
        await new Promise((resolve) => setTimeout(resolve, 4000))

        // throw new Error("Something went wrong");
    return (
        <div>
            <h1>This is a tutor page.</h1>
        </div>
    )
}