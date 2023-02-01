import {
    ILogProps,
    initializeLogger,
    TLogEntryLevels,
} from "@honzachalupa/utils";
import { version as appVersion } from "../package.json";

type TLogEntryCodes = "INFO" | "EXCEPTION" | "SECURITY_BREACH" | "DEBUGGING";

const levelsMap: {
    [key in TLogEntryLevels]: TLogEntryCodes[];
} = {
    info: ["INFO", "DEBUGGING"],
    warn: [],
    error: [],
};

const logger = initializeLogger({
    logtail: {
        token: "",
    },
    levelsMap,
    appVersion,
});

export const log = (props: ILogProps & { code: TLogEntryCodes }) => {
    logger.log(props);
};
