import apiClient from "@/utils/apiClient"

interface HighlightInfo {
    startPoint: number;
    endPoint: number;
    highlightsColor: string;
    highlightsFontColor?: string;
    highlightsFontSize?: number;
    isBold?: boolean;
}

interface CustomRequestInfoDTO{
    backgroundColor: string;
    highlightsInfos: HighlightInfo[];
}

export default async function postNewsDetailCustom(
    pageId: number,
    customRequestInfo: CustomRequestInfoDTO
): Promise<boolean> {
    try {
        const response = await apiClient.post(
            `/users/scrap/customize?scrap-id=${pageId}`,
            customRequestInfo
        );
        return response.data === true;
    } catch (e) {
        throw e;
    }
}