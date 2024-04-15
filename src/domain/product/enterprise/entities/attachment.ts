import { Entity } from '@/core/entities/entity'
import { Slug } from '@/core/entities/slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface AttachmentProps {
  viewUrl: string
  downloadUrl: string
  slug: Slug
}

export class Attachment extends Entity<AttachmentProps> {
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

  static create(props: AttachmentProps, id?: UniqueEntityID) {
    const attachment = new Attachment(props, id)
    return attachment
  }
}
