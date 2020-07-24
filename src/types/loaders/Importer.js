/* eslint-disable no-use-before-define */
// @flow

export type TImporterImageReturn = {
  value: string | boolean,
  name: string,
}

export type TImporterLoader = {
 img(
    file: File,
  ): Promise<TImporterImageReturn>,
}
