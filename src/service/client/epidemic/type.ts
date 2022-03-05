// 接口中的 track_type 轨道等级 2为路过  1为确诊地点
// 接口中的 risk_level 风险等级 3为高风险  2位中风险  1为低风险   0为无风险地

export interface ITrackDetail {
  area_code: number;
  area_name: string;
  city: string;
  create_ts: number;
  gid: string;
  local_id: number;
  poi: string;
  poi_name: string;
  poi_time: number;
  risk_level: number;
  township: string;
  track_type: number;
}
