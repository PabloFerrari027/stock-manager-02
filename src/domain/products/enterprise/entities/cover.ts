import { Slug } from '@/core/entities/slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Attachment, AttachmentProps } from './attachment'

export interface CoverProps extends AttachmentProps {}

export class Cover extends Attachment {
  get viewUrl() {
    return this.props.viewUrl
  }

  get downloadUrl(): string {
    return this.props.downloadUrl
  }

  get slug() {
    return this.props.slug
  }

  set viewUrl(value: string) {
    this.props.viewUrl = value
  }

  set downloadUrl(value: string) {
    this.props.downloadUrl = value
  }

  set slug(value: Slug) {
    this.props.slug = value
  }

  static create(props: CoverProps, id?: UniqueEntityID) {
    const cover = new Cover(props, id)
    return cover
  }
}
