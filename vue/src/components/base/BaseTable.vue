<template>
  <div class="grid grid-employee">
    <table border="0" cellspacing="0">
      <colgroup>
        <col style="width: 120px" />
        <col style="width: 170px" />
        <col style="width: 130px" />
        <col style="width: 120px" />
        <col style="width: 120px" />
        <col style="width: 260px" />
        <col style="width: 120px" />
        <col style="width: 120px" />
        <col style="width: 130px" />
        <col style="width: 130px" />
      </colgroup>
      <thead>
        <tr>
          <th
            v-for="(field, index) in fields"
            :key="index"
            :fieldName="field.fieldName"
            :class="field.textAlign"
          >
            {{ field.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
            v-for="(item,index) in data"
            v-bind:key="index"
            @dblclick="rowOnDblClick(item)"
            @click="toggle(item)"
            :class="{ isSelected: selectedItems.includes(item) }"
        >
            <td 
                v-for="(field,key) in fields"
                :key="key"
                :class="field.textAlign"
            >
                {{ format(item[field.fieldName], field.format) }}
            </td>
          
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
    },
    fields: {
      type: Array,
    },
    opened: {
        type: Array
    }
  },
  data() {
      return {
          selectedItems: this.opened
      }
  },
    methods: {
        format(value, format){
            if(format == null) {
                return value;
            }
            if(format == "date"){
                var date = new Date(value);
                if (Number.isNaN(date.getTime())) {
                    return "";
                } else {
                    var day = date.getDate(),
                    month = date.getMonth() + 1,
                    year = date.getFullYear();
                    day = day < 10 ? "0" + day : day;
                    month = month < 10 ? "0" + month : month;
                    return `${day}/${month}/${year}`;
                }
            }
            if(format == "money"){
                if (value) {
                    return value.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
                }
                return "";
            }
        },
        rowOnDblClick(item){
            this.$emit("row-on-dblclick",item)
        },
        toggle(item) {
            let i = this.selectedItems.indexOf(item);
            if (i > -1) {
                this.selectedItems.splice(i, 1);
            } else {
                this.selectedItems = [];
                this.selectedItems.push(item);
            }
            console.log(this.opened)
            this.$emit("update-selected-items", this.selectedItems)
        },
    },
};
</script>

<style scoped>

    .selectedrow {
        background-color: #019160 !important;
    }
    .isSelected {
        background-color: #019160 !important;
    }
</style>