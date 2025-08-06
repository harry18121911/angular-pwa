export type News = {
  uuid: string,
  title: string,
  content: string,
  topic: string,
  is_deleted: boolean,
  ts_last_updated: number,
  ts_expiration: number,
}
