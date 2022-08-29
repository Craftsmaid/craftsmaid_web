export default {
    name : 'menu',
    title: 'Menu',
    type: 'Document',
    fields : [
        {
            name: 'name',
            title: 'Name',
            type: 'string'
        },
        {
            name: 'description',
            title: 'Description',
            type: 'string'
        },
        {
            name: 'status',
            title: 'Status',
            type: 'string'
        },
        {
            name: 'quantity',
            title: 'Quantity',
            type: 'integer'
        },
        {
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [
                {
                    name : 'imgUrl',
                    title: 'ImgUrl',
                    type: 'image',
                    options: {
                        hotspot: true
                    }
                }
            ]
        }
    ]
}