/**
 * @swagger
 *  components:
 *      schemas:
 *          AddEpisode:
 *              type: object
 *              required:
 *                  -   courseID
 *                  -   chapterID
 *                  -   title       
 *                  -   text       
 *                  -   video       
 *                  -   type       
 *              properties:
 *                  courseID:
 *                      type: string
 *                      example: 643e752f148208a35ddf8bde
 *                  chapterID: 
 *                      type: string
 *                      example: 644a33b85264b38ccd9ac635
 *                  title:
 *                      type: string
 *                      description: the title of episode
 *                      example: ویدیو شماره یک - متغیر ها
 *                  text: 
 *                      type: string
 *                      description: the describe about this episode
 *                      example: توی این قسمت بطور کامل دررابطه با .... گفته شده
 *                  type: 
 *                      type: string
 *                      description: the episode type (unlock or lock)
 *                      enum:
 *                          -   unlock
 *                          -   lock
 *                  video: 
 *                      type: string
 *                      description: the file of video 
 *                      format: binary
 *          EditEpisode:
 *              type: object     
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of episode
 *                      example: ویدیو شماره یک - متغیر ها
 *                  text: 
 *                      type: string
 *                      description: the describe about this episode
 *                      example: توی این قسمت بطور کامل دررابطه با .... گفته شده
 *                  type: 
 *                      type: string
 *                      description: the episode type (unlock or lock)
 *                      enum:
 *                          -   unlock
 *                          -   lock
 *                  video: 
 *                      type: string
 *                      description: the file of video 
 *                      format: binary
 */
/**
 * @swagger
 *  /admin/episode/add:
 *      post:
 *          tags: [Episode(Admin-Panel)]
 *          summary: create new Chapter for courses
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data: 
 *                      schema:
 *                          $ref: '#/components/schemas/AddEpisode'
 *          responses:
 *              201:
 *                  description: success - created
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/definitions/publicDefinition'
 */