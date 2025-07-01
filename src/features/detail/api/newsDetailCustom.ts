import { HighlightInfo } from "@/types/custom/highlightInfo";
import apiClient from "@/utils/api/apiClient";

interface CustomRequestInfoDTO {
  backgroundColor: string;
  highlightsInfos: HighlightInfo[];
}

export default async function postNewsDetailCustom(
  pageId: number,
  customRequestInfo: CustomRequestInfoDTO,
): Promise<boolean> {
  try {
    const response = await apiClient.post(
      `/users/scrap/customize?scrap-id=${pageId}`,
      customRequestInfo,
    );
    return response.data === true;
  } catch (e) {
    throw e;
  }
}
