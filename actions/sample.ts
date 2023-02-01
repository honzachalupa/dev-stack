import { Database } from "../supabase/types";
import { supabase } from "../utils/supabase";

const create = async (
    payload: Database["public"]["Tables"]["sample"]["Insert"]
) => {
    const { error } = await supabase.from("sample").insert([payload]);

    if (error) {
        throw new Error(error.message);
    }
};

const search = async () => {
    const { data, error } = await supabase.from("sample").select();

    if (error) {
        throw new Error(error.message);
    }

    if (!data) {
        throw new Error("Record not found");
    }

    return data;
};

export const SampleActions = {
    create,
    search,
};
