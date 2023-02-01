import { getRandomInRange } from "@honzachalupa/utils";
import { useQuery } from "react-query";
import { SampleActions } from "../../../actions/sample";
import { FlowbiteUI } from "../../../components/flowbite-ui";
import { LayoutPrimary as Layout } from "../../../components/layouts/Primary";

export default function SupabaseDbDemo() {
    const { data, refetch } = useQuery("data", SampleActions.search);

    const addSampleRecord = () => {
        SampleActions.create({
            key: `key-${getRandomInRange(10000, 99999)}`,
            value: "Sample value.",
            createdDate: new Date().toString(),
        }).then(() => refetch());
    };

    return (
        <Layout headline="Supabase DB Demo">
            {data && <FlowbiteUI.Table items={data as any} />}

            <div className="mt-8">
                <FlowbiteUI.Button
                    label="New record"
                    onClick={addSampleRecord}
                />
            </div>
        </Layout>
    );
}
